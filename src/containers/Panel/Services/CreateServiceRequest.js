import ProfileImage from "../../../components/ProfileImage";
import { toPersianDigit } from "../../../utils/toPersianDigit";
import CreatRequestForm from "../../../modules/Service/CreateRequestForm";

const CreateServiceRequest = () => {

  return (<>
    <h2 className="text-[19px] font-bold mb-4">اطلاعات کاربری</h2>
    <div>
      <CreatRequestForm />
    </div>
  </>);
};
export default CreateServiceRequest;