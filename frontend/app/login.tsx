import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { LoginFormData } from './types/login';
import { useState } from 'react';
import { loginSchema } from './schemas/login.schema';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { useAuthStore } from './context/useAuth';

export default function LoginScreen() {
    const { signIn } = useAuthStore();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
      });

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        try {
            await signIn(data);
            router.push('/');
        } catch (err: any) {
          showMessage({
            message: err.message || "An error occurred during login.",
            type: "danger",
          });  
        }
    }

  return (
    <>
    <FlashMessage position="top" />
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <View style={styles.content}>
        <View style={styles.form}>
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Email</Text>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value }}) => (
                        <TextInput
                        style={styles.inputValue}
                        placeholder="your@email.com"
                        placeholderTextColor="#99A1AF"
                        onChangeText={onChange}
                        value={value}
                        />
                    
                    )}
                />
                 {errors.email && <Text style={styles.fieldError}>{errors.email.message}</Text>}
            </View>
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value }}) => (
                        <TextInput
                        style={styles.inputValue}
                        placeholder="*******"
                        placeholderTextColor="#99A1AF"
                        secureTextEntry
                        onChangeText={onChange}
                        value={value}
                        />
                    )}
                />     
                {errors.password && <Text style={styles.fieldError}>{errors.password.message}</Text>}           
                <Text style={styles.forgotPasswordLabel}>Forgot your password?</Text>
            </View>
        </View>
        <Pressable
          onPress={handleSubmit(onSubmit)}
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
                <Link href="/register" style={styles.signUpText}>Sign Up</Link>
            </View>
          </View>
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    padding: 20,
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
  fieldError: {
    color: 'red',
    fontSize: 12,
    width: '100%',
  }
});