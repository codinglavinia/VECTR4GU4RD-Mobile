import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase/config';

export default function RegisterScreen() {
  // estados del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  // función de registro
  const handleRegister = async () => {
    setError('');

    // validación básica
    if (password !== confirmPassword) {
      setError('las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('la contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      // crear usuario en firebase
      await createUserWithEmailAndPassword(auth, email, password);

      // redirigir al login
      router.replace('/(auth)/login');
    } catch (err: any) {
      setError('no se pudo crear la cuenta');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>crear cuenta</Text>

      <TextInput
        placeholder="email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="contraseña"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TextInput
        placeholder="confirmar contraseña"
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>registrarse</Text>
      </TouchableOpacity>

      {/* volver al login */}
      <TouchableOpacity
        style={styles.back}
        onPress={() => router.replace('/(auth)/login')}
      >
        <Text style={styles.link}>volver a iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1020',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#00e5ff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 28,
  },
  input: {
    backgroundColor: '#121a3a',
    color: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#00e5ff',
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  error: {
    color: '#ff5252',
    textAlign: 'center',
    marginBottom: 8,
  },
  back: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: '#ffd600',
    fontSize: 14,
  },
});
