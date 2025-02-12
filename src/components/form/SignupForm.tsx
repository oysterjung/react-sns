import { SignupRequest } from "@/types/request";
import { FieldErrors, useForm } from "react-hook-form";
import * as S from './style';
import { SignupResponse } from "@/types/response";
import { AxiosError } from "axios";
import { UseMutateFunction } from "@tanstack/react-query";

interface SignFormProps {
    mutate: UseMutateFunction<SignupResponse | undefined, AxiosError, SignupRequest>
  }

function SignupForm({ mutate }:SignFormProps) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SignupRequest>({mode: 'onChange'});
    //로그인 error메세지 표시는 로그인 요청을 보내고 응답으로 에러가 오면 그것을 이용해서 에러 메세지를 보여준다.(이메일 혹은 비밀번호가 일치하지 않습니다.)
    // 이메일/비밀번호는 공통으로 에러 메세지 표시 비밀번호 유추 할 수 있기때문
    // const onRegisterClick = () => {
    //     reset();
    //     setType("register");
    //   }
    //   const onLoginClick = () => {
    //     reset();
    //     setType("login");
    //   }

    const onValid = (data: SignupRequest) => {
        mutate(data)
        console.log(data)
    }
    
    const onInvalid = (errors: FieldErrors) => {
        console.log(errors)
    }
      return (
        <S.LogForm onSubmit={handleSubmit(onValid, onInvalid)}>
         <S.LoginInput {...register('email', {
          required: 'Email is required',
          pattern:{
            value:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 
            message:"이메일 형식이 아닙니다."
          }
      })} type="text" placeholder='Email'/>
      <S.ErrorSignMessage>{errors.email?.message}</S.ErrorSignMessage>

         <S.LoginInput {...register('username', {
          required: 'Username is required',
          minLength: {
          message: '5글자 이상 작성 바람',
          value: 5,
      }
      })} type="text" placeholder='Username'/>
      <S.ErrorSignMessage>{errors.username?.message}</S.ErrorSignMessage>

         <S.LoginInput {...register('password',{required: 'Password is required',
         pattern: { 
          value:  /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
          message: '비밀번호를 8~16자로 영문 대소문자, 숫자, 특수기호를 조합해서 사용하세요.',
        },
        })} type="password" placeholder='Password'/>
       <S.ErrorSignMessage>{errors.password?.message}</S.ErrorSignMessage> 

        <button disabled={isSubmitting}>가입</button>
        </S.LogForm>
      ) 
}

export default SignupForm