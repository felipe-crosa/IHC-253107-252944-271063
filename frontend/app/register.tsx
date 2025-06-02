import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Link, Redirect, useRouter } from 'expo-router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { RegisterFormData } from './types/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './schemas/register.schema';
import * as authenticationService from './services/authentication.service';
import { ErrorAlert } from '@/components/ErrorAlert';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

     const {
            control,
            handleSubmit,
            formState: { errors },
          } = useForm<RegisterFormData>({
            resolver: zodResolver(registerSchema),
            defaultValues: {
                name: '',
                email_address: '',
                password: ''
            }
          });


    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
            try {
                await authenticationService.register(data);
                setSuccess('Account created successfully!');
                router.navigate('/login');
            } catch (err: any) {
                setError(err.message?.data);
            }
        }

  return (
    <>
    {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Join EventBuddy</Text>
      <View style={styles.content}>
        <View style={styles.form}>
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value }}) => (
                        <TextInput
                        style={styles.inputValue}
                        placeholder="Your name"
                        placeholderTextColor="#99A1AF"
                        onChangeText={onChange}
                        value={value}
                        />
                    
                    )}
                />
                 {errors.name && <Text style={styles.fieldError}>{errors.name.message}</Text>}            
            </View>
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Email</Text>
                <Controller
                    control={control}
                    name="email_address"
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
                 {errors.email_address && <Text style={styles.fieldError}>{errors.email_address.message}</Text>} 
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
            </View>
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <Controller
                    control={control}
                    name="password_confirmation"
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
                {errors.password_confirmation && <Text style={styles.fieldError}>{errors.password_confirmation.message}</Text>}       
            </View>
            <View>
                <Pressable style={styles.profileImageBtn}>
                    <Image
                        source={require('@/assets/images/profile-placeholder.png')}
                        style={styles.profileImage} />
                </Pressable>
            </View>
            <View style={styles.registerButtonSection}>
            <Pressable
            onPress={handleSubmit(onSubmit)}
            style={styles.registerButton}>
                <Text style={styles.registerLabel}>Create Account</Text>
            </Pressable>
            <View style={styles.hasAccount}>
                <Text style={styles.hasAccountText}>Already have an account?</Text>
                <Link href="/login" style={styles.signInText}>Sign In</Link>
            </View>
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
  profileImageBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    padding: 40,
    borderColor: '#E9D4FF',
    backgroundColor: '#D9D9D9',
  },
  profileImage: {
    width: 40,
    height: 40,
  },
  registerButtonSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  registerButton: {
    backgroundColor: '#8200DB',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  registerLabel: {
    color: 'white', 
    fontWeight: '700'
  }, 
  hasAccount: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  hasAccountText: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: '400',
  },
  signInText: {
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