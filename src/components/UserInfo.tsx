import React from "react";

interface UserInfoProps {
  className?: string;
}

type User = {
  name: string;
  id: string;
  diseases: string;
  complaints: string;
  allergies: string;
};

const exampleUser: User = {
  name: "John Doe",
  id: "123-456-7890",
  diseases: "Diabetes, Hypertension",
  complaints: "Headache, Stomachache",
  allergies: "Peanuts, Fish",
};

const UserInfo = ({ className }: UserInfoProps) => {
  return (
    <div className={`p-4 lg:flex flex-col gap-4 ${className}`}>
      <div className="bg-white rounded-lg p-5 flex flex-col gap-2 ">
        <div className="text-2xl xl:text-4xl font-bold">{exampleUser.name}</div>
        <div># {exampleUser.id}</div>
      </div>
      <div className="bg-white rounded-lg p-5 h-full">
        <div className="text-2xl xl:text-4xl font-bold mb-3">Medical Notes</div>
        <div className="flex flex-col gap-2">
          <div>
            <div className="font-semibold">Known Diseases:</div>
            <div className="">{exampleUser.diseases}</div>
          </div>
          <div>
            <div className="font-semibold">Complaints:</div>
            <div className="">{exampleUser.complaints}</div>
          </div>
          <div>
            <div className="font-semibold">Allergies:</div>
            <div className="">{exampleUser.allergies}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
