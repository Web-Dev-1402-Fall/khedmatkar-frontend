import ProfileImage from "../../../components/ProfileImage";
import { toPersianDigit } from "../../../utils/toPersianDigit";
import CreatRequestForm from "../../../modules/Service/CreateRequestForm";

const CreateServiceRequest = () => {

  return (<>
    <h2 className="text-[19px] font-bold mb-4">ثبت درخواست خدمت</h2>
    <h2 className="text-[15px] mb-4"> در اینجا می‌توانید خدمتی که می خواهید را ثبت کنید تا متخصصین در اسرع وقت آن‌را بررسی کنند.</h2>
    <div>
      <CreatRequestForm />
    </div>
  </>);
};
export default CreateServiceRequest;