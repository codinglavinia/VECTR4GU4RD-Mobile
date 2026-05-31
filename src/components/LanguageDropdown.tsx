import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
    { code: 'ro', label: 'Română' },
    { code: 'de', label: 'Deutsch' },
  ];

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.button}>
        <Text style={styles.buttonText}>🌐 {language.toUpperCase()}</Text>
      </TouchableOpacity>

      <Modal transparent animationType="fade" visible={open}>
        <TouchableOpacity style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.menu}>
            {languages.map(lang => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => {
                  setLanguage(lang.code as any);
                  setOpen(false);
                }}
                style={styles.item}
              >
                <Text style={styles.itemText}>{lang.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#111827',
  },
  buttonText: {
    color: '#e5e7eb',
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  menu: {
    backgroundColor: '#0b1220',
    borderRadius: 12,
    padding: 12,
    width: 220,
  },
  item: {
    paddingVertical: 10,
  },
  itemText: {
    color: '#e5e7eb',
    fontSize: 16,
  },
});
