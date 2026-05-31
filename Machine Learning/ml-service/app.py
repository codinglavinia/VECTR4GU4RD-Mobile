from flask import Flask, request, jsonify
from flask_cors import CORS
from model import MLModelManager
import os

app = Flask(__name__)
CORS(app)

# Instanciamos el Gestor Multi-Motor
model_manager = MLModelManager()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'ml-service', 'engines_ready': list(model_manager.models.keys())}), 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extraemos el motor deseado (por defecto UNSW si no se especifica)
        engine = data.get('engine', 'UNSW')
        
        # Extraemos todas las features posibles. El Manager ignorará las que no necesite.
        features = {
            'rate': data.get('rate', 0),
            'dload': data.get('dload', 0),
            'sttl': data.get('sttl', 0),
            'src_bytes': data.get('src_bytes', 0),
            'dst_bytes': data.get('dst_bytes', 0),
            'duration': data.get('duration', 0),
            'protocol': data.get('protocol', 'TCP'),
            'state': data.get('state', 'CON'),
            'flag': data.get('flag', 'SF')
        }
        
        # Enviamos las features y el motor deseado
        prediction = model_manager.predict(features, engine=engine)
        
        return jsonify({
            'engine_used': prediction['engine_used'],
            'confidence': float(prediction['confidence']),
            'category': prediction['category'],
            'features': features
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/rules', methods=['GET'])
def get_rules():
    return jsonify({
        'rules': [
            {
                'id': 'ttl_rule',
                'name': 'TTL Check',
                'description': 'Check if TTL is suspiciously low',
                'threshold': 10
            },
            {
                'id': 'rate_rule',
                'name': 'Rate Check',
                'description': 'Check if packet rate is suspiciously high',
                'threshold': 1000
            },
            {
                'id': 'port_rule',
                'name': 'Port Blacklist',
                'description': 'Check if port is in blacklist',
                'blacklist': [4444, 5555, 8888, 445]
            }
        ]
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=os.getenv('FLASK_ENV') == 'development')
