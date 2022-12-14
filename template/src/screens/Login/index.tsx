import React from 'react';
import {Button, Screen, Input} from 'ui';
import {useAuth} from 'core';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {KeyboardAvoidingView} from 'react-native';
import {View} from 'react-native-ui-lib';

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

export const Login = () => {
  const {signIn} = useAuth();

  const {handleSubmit, control} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    signIn({access: 'access-token', refresh: 'refresh-token'});
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <View flex centerV paddingH-20>
        <Screen>
          <Input control={control} name="email" label="Email" />
          <Input
            control={control}
            name="password"
            label="Password"
            placeholder="***"
            secureTextEntry={true}
          />
          <Button
            label="Login"
            onPress={handleSubmit(onSubmit)}
            variant="secondary"
          />
        </Screen>
      </View>
    </KeyboardAvoidingView>
  );
};
