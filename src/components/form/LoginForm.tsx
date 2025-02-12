import { LoginRequest } from "@/types/request";
import { FieldErrors, useForm } from "react-hook-form";
import * as S from './style';
import { LoginResponse } from "@/types/response";
import { AxiosError } from "axios";
import { UseMutateFunction } from "@tanstack/react-query";
import logo from "@/assets/logo.png"
import { NavLink, useNavigate } from "react-router-dom";

interface LoginFormProps {
  mutate: (data:LoginRequest)=>void;
  isLoading: boolean,
  error: unknown,
  modal: boolean,
} 


function LoginForm({ mutate, isLoading, error, modal }: LoginFormProps) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LoginRequest>();
    //로그인 error메세지 표시는 로그인 요청을 보내고 응답으로 에러가 오면 그것을 이용해서 에러 메세지를 보여준다.(이메일 혹은 비밀번호가 일치하지 않습니다.)
    // 이메일/비밀번호는 공통으로 에러 메세지 표시 비밀번호 유추 할 수 있기때문
    const onValid = (data: LoginRequest) => {
      mutate(data)
      console.log(data)
  }
  
  const onInvalid = (errors: FieldErrors) => {
      console.log(errors)
  }
   
return (
  <>
  <S.LoginLogo src={logo}/>
    <S.LogForm onSubmit={handleSubmit(onValid, onInvalid)}>
          <S.LoginInput {...register('email', {
            required: 'Email is required',
            pattern:{
              value:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 
              message:"이메일 형식이 아닙니다."
            }
            })} type="text" placeholder="test@email.com"/>
                <S.LoginInput {...register('password',{required: 'Password is required',
               pattern: { // input의 정규식 패턴
                value: /^[A-za-z0-9]{8,16}$/,
                message: '비밀번호는 숫자, 영문 대문자, 소문자를 포함한 8글자 이상 16글자 이하 이여야 합니다.',
              },
              
              })} type="password" placeholder='Password'/>
             
                
             <button>{isLoading ? "Loading..." : "로그인"}</button>
             
      {errors.email?.message || errors.password?.message || error? <S.ErrorLoginMessage>이메일 또는 비밀번호가 일치하지 않습니다.</S.ErrorLoginMessage> : null}
      </S.LogForm>
      {modal?  
      <S.ModalSubTitleWrap>
     
          <S.SubTitle>계정이 없으신가요?</S.SubTitle>
          <NavLink to='/signup'>가입하기</NavLink> 
      
      </S.ModalSubTitleWrap>
          : null
        }
  </>
)

}

export default LoginForm