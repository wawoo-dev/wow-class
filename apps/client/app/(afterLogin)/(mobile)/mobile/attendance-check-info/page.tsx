"use client";

import { Space, Text } from "@wow-class/ui";

import { AttendanceCheckBox } from "./_components/AttendanceCheckBox";

const MobileAttendanceCheckInfoPage = () => {
  return (
    <>
      <Text as="h1" typo="h1">
        출석 체크
      </Text>
      <Space height={40} />

      <AttendanceCheckBox />
    </>
  );
};

export default MobileAttendanceCheckInfoPage;
