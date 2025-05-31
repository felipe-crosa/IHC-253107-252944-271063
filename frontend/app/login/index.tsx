import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Image } from 'expo-image';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <View style={styles.content}>
        <View style={styles.form}>
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput style={styles.inputValue} placeholder={'your@email.com'} placeholderTextColor={'#99A1AF'}/>
            </View>
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput style={styles.inputValue} placeholder={'*******'} secureTextEntry={true} placeholderTextColor={'#99A1AF'}/>
                <Text style={styles.forgotPasswordLabel}>Forgot your password?</Text>
            </View>
        </View>
        <Pressable
          onPress={() => console.log('Login pressed')}
          style={styles.loginButton}>
            <Text style={styles.loginLabel}>Login</Text>
          </Pressable>
          <View style={styles.optionsSection}>
            <View style={styles.divider}>
                <View style={styles.line}></View>
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.line}></View>
            </View>
            <View style={styles.options}>
                <Pressable style={styles.option} onPress={() => console.log('Google pressed')}>
                    <Image
                        source={require('@/assets/images/google-icon.svg')}
                        style={{ width: 30, height: 30 }} />
                </Pressable>
            </View>
            <View style={styles.noAccount}>
                <Text style={styles.noAccountText}>Don't have an account?</Text>
                <Text style={styles.signUpText}>Sign Up</Text>
            </View>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  title: {
    color: "#8200DB",
    fontSize: 32,
    fontWeight: '700'
  }, 
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 40,
    paddingHorizontal: 10,
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 20,
  }, 
  input: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
    gap: 10,
  },
  inputLabel: {
    color: '#1F2937',
    fontWeight: '500',
    fontSize: 14,
    width: '100%',
  },
  inputValue: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#D1D5DC',
    backgroundColor: '#F5F7FA',
    borderRadius: 15,
    width: '100%',
  }, 
  forgotPasswordLabel: {
    color: "#8200DB",
    fontSize: 12,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#8200DB',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  loginLabel: {
    color: 'white', 
    fontWeight: '700'
  }, 
  optionsSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: 25,
  },
  divider: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  line: {
    backgroundColor: '#99A1AF',
    height: 1,
    flex: 1,
  }, 
  dividerText: {
    color: '#99A1AF',
    fontSize: 14,
    fontWeight: '500',
    position: 'relative',
    top: -1,
  }, 
  options: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  option: {
    borderWidth: 1,
    borderColor: '#99A1AF',
    borderRadius: 15,
    paddingHorizontal: 50,
    paddingVertical: 10,
  }, 
  noAccount: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  noAccountText: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: '400',
  },
  signUpText: {
    color: '#8200DB',
    fontSize: 14,
    fontWeight: '600',
  },
});