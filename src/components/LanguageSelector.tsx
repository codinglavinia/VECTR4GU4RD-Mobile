import i18n from '@/i18n';
import { LANGUAGES } from '@/i18n/languages';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LanguageSelector() {
  return (
    <View style={styles.container}>
      {LANGUAGES.map(language => (
        <TouchableOpacity
          key={language.code}
          style={styles.button}
          onPress={() => {
            /*
              Cambia el idioma de la aplicación manualmente.
              i18n-js actualiza los textos automáticamente.
            */
            i18n.locale = language.code;
          }}
        >
          <Text style={styles.flag}>
            {language.flag}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    /*
      Contenedor horizontal para los iconos de idiomas
    */
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 16,
  },
  button: {
    /*
      Área táctil para cada idioma
    */
    padding: 6,
  },
  flag: {
    /*
      Tamaño del emoji de la bandera
    */
    fontSize: 24,
  },
});
