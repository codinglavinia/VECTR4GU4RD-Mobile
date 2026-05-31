import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from datetime import datetime, timedelta
import joblib
import os
import warnings

class MLModelManager:
    def __init__(self):
        self.models = {
            'UNSW': None,
            'KDD': None
        }
        self.cache = {}
        self.cache_ttl = timedelta(minutes=5)
        self._load_or_create_models()

    def _load_or_create_models(self):
        # Intentamos cargar o crear el motor UNSW (Principal)
        try:
            self.models['UNSW'] = joblib.load('model_unsw.pkl')
            print("Motor UNSW cargado desde disco.")
        except (FileNotFoundError, OSError):
            self.models['UNSW'] = self._create_model('dataset_unsw.csv', 'UNSW')
            joblib.dump(self.models['UNSW'], 'model_unsw.pkl')

        # Intentamos cargar o crear el motor KDD (Secundario/Clásico)
        try:
            self.models['KDD'] = joblib.load('model_kdd.pkl')
            print("Motor KDD cargado desde disco.")
        except (FileNotFoundError, OSError):
            self.models['KDD'] = self._create_model('dataset_kdd.csv', 'KDD')
            joblib.dump(self.models['KDD'], 'model_kdd.pkl')

    def _create_model(self, dataset_path, engine_name):
        try:
            print(f"[{engine_name}] Intentando cargar dataset real desde {dataset_path}...")
            
            if engine_name == 'UNSW':
                df = pd.read_csv(dataset_path)
                # Convertimos campos de texto a binarios (1.0 o 0.0) para la red neuronal
                df['protocol_tcp'] = (df['proto'] == 'tcp').astype(float)
                df['state_con'] = (df['state'] == 'CON').astype(float)
                
                X_train = df[['rate', 'dload', 'sttl', 'protocol_tcp', 'state_con']].values
                y_train = df['label'].values # 0 (Normal) o 1 (Ataque)
            else:
                # KDD no tiene cabeceras. Definimos las 43 oficiales del NSL-KDD
                kdd_cols = ["duration","protocol_type","service","flag","src_bytes","dst_bytes","land",
                            "wrong_fragment","urgent","hot","num_failed_logins","logged_in",
                            "num_compromised","root_shell","su_attempted","num_root","num_file_creations",
                            "num_shells","num_access_files","num_outbound_cmds","is_host_login",
                            "is_guest_login","count","srv_count","serror_rate","srv_serror_rate",
                            "rerror_rate","srv_rerror_rate","same_srv_rate","diff_srv_rate",
                            "srv_diff_host_rate","dst_host_count","dst_host_srv_count",
                            "dst_host_same_srv_rate","dst_host_diff_srv_rate","dst_host_same_src_port_rate",
                            "dst_host_srv_diff_host_rate","dst_host_serror_rate","dst_host_srv_serror_rate",
                            "dst_host_rerror_rate","dst_host_srv_rerror_rate","label","difficulty_level"]
                df = pd.read_csv(dataset_path, names=kdd_cols)
                
                # Convertimos a binarios para KDD
                df['protocol_tcp'] = (df['protocol_type'] == 'tcp').astype(float)
                df['flag_sf'] = (df['flag'] == 'SF').astype(float)
                
                X_train = df[['src_bytes', 'dst_bytes', 'duration', 'protocol_tcp', 'flag_sf']].values
                # KDD tiene etiquetas de texto ("normal", "neptune", "smurf"). 
                # Convertimos "normal" a 0, y cualquier ataque a 1.
                y_train = (df['label'] != 'normal').astype(int).values
                
            print(f"[{engine_name}] Dataset cargado. Entrenando Random Forest...")
            
        except FileNotFoundError:
            warnings.warn(f"[{engine_name}] No se encontró '{dataset_path}'. Creando POC simulado.")
            X_train = np.random.rand(100, 5)
            y_train = np.random.randint(0, 4, 100)
            
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)
        return model

    def predict(self, features, engine='UNSW'):
        # Si piden un motor que no existe, forzamos el principal
        if engine not in self.models:
            engine = 'UNSW'
            
        cache_key = f"{engine}_{str(features)}"
        
        if cache_key in self.cache:
            cached_result, timestamp = self.cache[cache_key]
            if datetime.now() - timestamp < self.cache_ttl:
                return cached_result
        
        # Extraemos variables dependiendo de lo que necesite el motor
        if engine == 'UNSW':
            feature_vector = np.array([[
                features.get('rate', 0),
                features.get('dload', 0),
                features.get('sttl', 0),
                1.0 if features.get('protocol', '').upper() == 'TCP' else 0.0,
                1.0 if features.get('state', '').upper() == 'CON' else 0.0
            ]])
        else: # KDD
            feature_vector = np.array([[
                features.get('src_bytes', 0),
                features.get('dst_bytes', 0),
                features.get('duration', 0),
                1.0 if features.get('protocol', '').upper() == 'TCP' else 0.0,
                1.0 if features.get('flag', '').upper() == 'SF' else 0.0
            ]])
        
        selected_model = self.models[engine]
        prediction = selected_model.predict(feature_vector)[0]
        probabilities = selected_model.predict_proba(feature_vector)[0]
        confidence = float(np.max(probabilities))
        
        categories = ['Normal', 'DDoS', 'Malware', 'Reconnaissance']
        category = categories[min(prediction, len(categories) - 1)]
        
        result = {
            'engine_used': engine,
            'confidence': confidence,
            'category': category,
            'timestamp': datetime.now().isoformat()
        }
        
        self.cache[cache_key] = (result, datetime.now())
        return result

    def clear_cache(self):
        self.cache.clear()
