"use client";
import { css } from "@styled-system/css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import type { StudyListApiResponseDto } from "types/dtos/studyList";

import EmptyStudyList from "./EmptyStudyList";
import StudyListItem from "./StudyListItem";

interface StudyListProps {
  studyList: StudyListApiResponseDto[] | undefined;
  semesterList: string[] | undefined;
  adminStatus: boolean;
}

const StudyList = ({
  studyList,
  semesterList,
  adminStatus,
}: StudyListProps) => {
  const semester = useSearchParams().get("semester");
  const router = useRouter();

  useEffect(() => {
    if (semester && semesterList && !semesterList.includes(semester))
      router.replace("/studies");
  }, [router, semester, semesterList]);

  if (studyList?.length === 0) {
    return <EmptyStudyList />;
  }

  return (
    <section aria-label="study-list" className={SectionStyle}>
      {studyList?.map(
        (studyItem) =>
          (semester === null ||
            semester ===
              `${studyItem.study.semester.academicYear}-${studyItem.study.semester.semesterType === "FIRST" ? 1 : 2}`) && (
            <StudyListItem
              adminStatus={adminStatus}
              key={`${studyItem.study.studyId}`}
              study={studyItem}
            />
          )
      )}
    </section>
  );
};

export default StudyList;

const SectionStyle = css({
  width: "100%",
  height: "100%",
  overflow: "auto",
});
