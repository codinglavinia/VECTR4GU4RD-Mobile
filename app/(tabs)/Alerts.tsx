import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { db } from '../../firebase/config';

type Alert = {
  id: string;
  attack_cat: string;
  description: string;
  ip: string;
  severity: string;
  timestamp: any;
};

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'Alerts'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const data: Alert[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Alert, 'id'>),
      }));

      setAlerts(data);
    });

    // cleanup muy importante
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: Alert }) => (
    <View style={styles.card}>
      <Text style={styles.attack}>{item.attack_cat}</Text>
      <Text style={styles.text}>{item.description}</Text>
      <Text style={styles.meta}>IP: {item.ip}</Text>
      <Text style={styles.severity}>Severity: {item.severity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Security Alerts</Text>

      <FlatList
        data={alerts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1020',
    padding: 16,
  },
  title: {
    color: '#00E5FF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#121A3A',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  attack: {
    color: '#FFD600',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#fff',
    marginVertical: 4,
  },
  meta: {
    color: '#aaa',
    fontSize: 12,
  },
  severity: {
    color: '#FF5252',
    fontWeight: 'bold',
    marginTop: 6,
  },
});
