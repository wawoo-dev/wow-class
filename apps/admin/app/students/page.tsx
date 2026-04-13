import { Flex } from "@styled-system/jsx";
import { studyApi } from "apis/study/studyApi";
import isAdmin from "utils/isAdmin";

import StudentsContent from "./_components/StudentsContent";
import StudentsHeader from "./_components/StudentsHeader";

const StudentsPage = async () => {
  const adminStatus = await isAdmin();
  const studyList = adminStatus
    ? await studyApi.getStudyList()
    : await studyApi.getMyStudyList();

  return (
    <Flex direction="column" gap="1.5rem">
      <StudentsHeader studyList={studyList ?? []} />
      <StudentsContent />
    </Flex>
  );
};

export default StudentsPage;
