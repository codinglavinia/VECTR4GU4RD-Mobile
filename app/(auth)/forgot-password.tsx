import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase/config';

export default function ForgotPasswordScreen() {
  // estado del email
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  // enviar email de recuperación
  const handleResetPassword = async () => {
    setError('');
    setMessage('');

    if (!email) {
      setError('introduce un email válido');
      return;
    }

    try {
      // firebase envía el correo automáticamente
      await sendPasswordResetEmail(auth, email);
      setMessage('correo de recuperación enviado');
    } catch (err: any) {
      setError('no se pudo enviar el correo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>recuperar contraseña</Text>

      <TextInput
        placeholder="email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      {message !== '' && <Text style={styles.success}>{message}</Text>}
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>enviar correo</Text>
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
    fontSize: 26,
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
  success: {
    color: '#4caf50',
    textAlign: 'center',
    marginBottom: 8,
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
