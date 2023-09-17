import { FC, useEffect } from "react";
import { useChangeUserUsernameMutation } from "../../../services/api/user.api";
import { useInput } from "../../../hooks/useInput";
import { useParams } from "react-router-dom";
import { Modal, MyButton, Popup} from "..";
import { useMessage } from "../../../hooks/useMessage";

interface ModalUsernameProps {
  visable: boolean;
  handleOnClick: (visable: boolean) => void;
}

const ModalUsername: FC<ModalUsernameProps> = ({ visable, handleOnClick }) => {
  const { bind, reset, value } = useInput("");
  const { id } = useParams();
  const [changeUsername, {error, isLoading}] = useChangeUserUsernameMutation();
  const message = useMessage('')

  useEffect(() => {
    if (error) {
      if ('originalStatus' in error) {
        handleOnClick(false);
      } else if ('status' in error) {
        if (error.status === 400) {
          if ('data' in error) {
            const test:any = error.data
            if ('message' in test) {
              message.setMessage(
                test.message
              );
            }
          }
        }
      }
    }
  },[error])

  return (
    <Modal
      visable={visable}
      setVisable={handleOnClick}
      title={"Изменение имени пользователя"}
    >
      <input
        className="w-full rounded-[2px] border-[2px] border-mooduck-gray px-3 py-[15px]"
        placeholder="Введите новое имя пользователя"
        name="changeUsername"
        type="text"
        {...bind}
      />
      <MyButton
        disabled={isLoading}
        className="py-[15px]"
        onClick={() => {
          changeUsername({ id: id, username: value })
          reset()
        }}
      >
        Сохранить изменения
      </MyButton>
      {message.message && <Popup handleOnClose={message.setMessage} message={message.message} />}
    </Modal>
  );
};

export default ModalUsername;
