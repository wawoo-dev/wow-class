"use client";

import { Flex } from "@styled-system/jsx";
import { Text } from "@wow-class/ui";
import ItemSeparator from "components/ItemSeparator";
import { useAtom } from "jotai";
import type { CSSProperties } from "react";
import { useEffect } from "react";
import type { StudyListApiResponseDto } from "types/dtos/studyList";

import { studyAtom } from "../../_contexts/StudyProvider";
import StudyDropDown from "../StudyDropDown";
import DownloadButton from "./DownloadButton";
import StudentsHeaderButtons from "./StudentHeaderButtons";

interface StudentsHeaderProps {
  studyList: StudyListApiResponseDto[];
}

const StudentsHeader = ({ studyList }: StudentsHeaderProps) => {
  const [selectedStudy, setSelectedStudy] = useAtom(studyAtom);

  useEffect(() => {
    if (!selectedStudy && studyList[0]) {
      setSelectedStudy({
        studyId: studyList[0].study.studyId,
        title: studyList[0].study.title,
      });
    }
  }, []);

  if (!selectedStudy || studyList.length === 0) return null;

  return (
    <Flex justify="space-between" paddingBottom="1.5rem">
      <Text as="h1" style={titleStyle} typo="h1">
        수강생 관리 <ItemSeparator height={6} width={6} />
        <StudyDropDown studyList={studyList} />
      </Text>
      <Flex align="center" gap="0.75rem">
        <StudentsHeaderButtons />
        {selectedStudy.studyId && (
          <DownloadButton studyId={selectedStudy.studyId} />
        )}
      </Flex>
    </Flex>
  );
};

const titleStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  whiteSpace: "nowrap",
};

export default StudentsHeader;
