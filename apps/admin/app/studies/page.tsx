import { Flex } from "@styled-system/jsx";
import { Text } from "@wow-class/ui";
import { studyApi } from "apis/study/studyApi";
import isAdmin from "utils/isAdmin";

import SemesterDropDown from "./_components/SemesterDropDown";
import StudyList from "./_components/StudyList";
import CreateStudyButton from "./create-study/_components/CreateStudyButton";

const StudiesPage = async () => {
  const adminStatus = await isAdmin();
  const studyList = adminStatus
    ? await studyApi.getStudyList()
    : await studyApi.getMyStudyList();

  const semesterList = studyList
    ? Array.from(
        new Set(
          studyList.map(
            (studyItem) =>
              `${studyItem.study.semester.academicYear}-${studyItem.study.semester.semesterType === "FIRST" ? 1 : 2}`
          )
        )
      )
        .sort()
        .reverse()
    : undefined;

  return (
    <>
      <Flex align="center" justifyContent="space-between">
        <Text typo="h1">{adminStatus ? "개설된 스터디" : "담당 스터디"}</Text>
        <SemesterDropDown semesterList={semesterList} />
      </Flex>
      <CreateStudyButton />
      <StudyList
        adminStatus={adminStatus}
        semesterList={semesterList}
        studyList={studyList}
      />
    </>
  );
};

export default StudiesPage;
