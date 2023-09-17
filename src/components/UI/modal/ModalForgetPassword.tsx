import { FC, memo, useEffect } from "react";
import Modal from "../Modal";
import MyButton from "../MyButton";
import { useResetPasswordMutation } from '../../../services/api/user.api'
import { useInput } from "../../../hooks/useInput";
import { Popup } from "..";
import { useMessage } from "../../../hooks/useMessage";

interface ModalForgetPassword {
  visable: boolean;
  setVisable: (visable: boolean) => void;
  setVisableAnotherModal: (visable: boolean) => void;
}

const ModalForgetPassword: FC<ModalForgetPassword> = memo(({
  visable,
  setVisable,
  setVisableAnotherModal
}) => {
  const { bind, value } = useInput("");
  const [resetPassword , {error}] = useResetPasswordMutation();
  const message = useMessage('');
  
  useEffect(()=>{
    if (error) {
      if ('data' in error) {
        console.log(error.data)
        if (error.data === 'Created') {
          setVisable(false)
          setVisableAnotherModal(true)
        } else {
          message.setMessage('Произошла ошибка, неправильный e-mail')
        }
      }
    }
  },[error])

  return (
    <Modal visable={visable} setVisable={setVisable} title={"Забыли пароль?"}>
      <p className="text-mooduck-gray ">
        Введите ваш E-mail, мы отправим письмо с кодом восстановления пароля
      </p>
      <input
        {...bind}
        type="text"
        className="w-full rounded-[2px] border-[1px] border-mooduck-gray px-3 py-[15px]"
        placeholder="Введите ваш E-mail"
      />
      <MyButton 
        className="py-[15px]" 
        onClick={() => {
          resetPassword(value)
        }}>
        Отправить
      </MyButton>
      {message.message && (
        <Popup handleOnClose={message.setMessage} message={message.message} />
      )}
    </Modal>
  );
});

export default ModalForgetPassword;
