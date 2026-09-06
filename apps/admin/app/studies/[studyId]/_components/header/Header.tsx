"use client";

import { css } from "@styled-system/css";
import { Flex } from "@styled-system/jsx";
import { Space, Text } from "@wow-class/ui";
import {
  formatWeekPeriod,
  getStudyEndDate,
  padWithZero,
} from "@wow-class/utils";
import ItemSeparator from "components/ItemSeparator";
import { dayToKorean } from "constants/dayToKorean";
import { studyToKoreanType } from "constants/study";
import Link from "next/link";
import { useState } from "react";
import type { StudyBasicInfoApiResponseDto } from "types/dtos/studyBasicInfo";
import { DownArrow } from "wowds-icons";
import TextButton from "wowds-ui/TextButton";

const Header = ({
  studyInfo,
}: {
  studyInfo: StudyBasicInfoApiResponseDto | undefined;
}) => {
  const [showIntro, setShowIntro] = useState(true);

  const handleClickShowIntro = () => {
    setShowIntro((prev) => !prev);
  };

  const introSectionButtonAriaLabel = showIntro
    ? "Collapse introduction"
    : "Expand introduction";
  const introSectionIconAriaLabel = showIntro
    ? "Collapse introduction icon"
    : "Expand introduction icon";

  if (!studyInfo) return null;
  const {
    title,
    semester,
    mentorName,
    type,
    dayOfWeek,
    startTime,
    endTime,
    description,
    descriptionNotionLink,
    openingDate,
    totalRound,
  } = studyInfo;

  const studySchedule = () => {
    if (startTime && endTime) {
      const { hour: startHour, minute: startMinute } = startTime;
      const { hour: endHour, minute: endMinute } = endTime;
      return `${dayToKorean[dayOfWeek]} ${startHour}:${padWithZero(startMinute)}-
        ${endHour}:${padWithZero(endMinute)}`;
    }
    return null;
  };

  const studyPeriod =
    openingDate && totalRound >= 0
      ? (() => {
          const endDate = getStudyEndDate(new Date(openingDate), totalRound);
          return formatWeekPeriod(openingDate, endDate.toISOString());
        })()
      : null;

  const studySemester = `${semester.academicYear}-${semester.semesterType === "FIRST" ? 1 : 2}`;

  return (
    <header>
      <section aria-label="my-study-header">
        <Flex alignItems="center" gap={8}>
          <Text as="h1" typo="h1">
            {title}
          </Text>
          <button
            aria-controls="intro-section"
            aria-expanded={showIntro}
            aria-label={introSectionButtonAriaLabel}
            tabIndex={0}
            onClick={handleClickShowIntro}
          >
            <DownArrow
              aria-label={introSectionIconAriaLabel}
              className={downArrowIconStyle}
              height={20}
              stroke="textBlack"
              style={{ rotate: showIntro ? "180deg" : "0deg" }}
              width={20}
            />
          </button>
        </Flex>
      </section>
      <section>
        <Space height={8} />
        <Flex gap="xs">
          <Text as="h5" color="sub">
            {studySemester}
          </Text>
          <ItemSeparator height={4} width={4} />
          <Text as="h5" color="sub">
            {mentorName != null ? `${mentorName} 멘토` : "탈퇴한 회원"}
          </Text>
          <ItemSeparator height={4} width={4} />
          <Text as="h5" color="sub">
            {studyToKoreanType[type]}
          </Text>
        </Flex>
      </section>
      {showIntro && (
        <section id="intro-section">
          <section aria-labelledby="study-schedule-heading">
            <Space height={24} />
            <Flex direction="column" gap="4">
              <Text as="h2" typo="h2">
                스터디 일정
              </Text>
              <Flex gap="xs">
                {startTime && endTime && (
                  <Flex gap="xs">
                    <Text as="h5" color="sub">
                      {studySchedule()}
                    </Text>
                    <ItemSeparator height={4} width={4} />
                  </Flex>
                )}
                {studyPeriod && (
                  <Text as="h5" color="sub">
                    {studyPeriod}
                  </Text>
                )}
              </Flex>
            </Flex>
          </section>
          <section aria-labelledby="study-intro-heading">
            <Space height={28} />
            <Flex direction="column" gap="xs">
              <Text as="h2" typo="h2">
                스터디 소개
              </Text>

              <Flex alignItems="center" gap="sm">
                <Link
                  href={descriptionNotionLink || ""}
                  rel="noopener"
                  role="button"
                  tabIndex={0}
                  target="_blank"
                >
                  <TextButton
                    aria-label="스터디 소개 페이지 열기"
                    style={{ padding: "0px" }}
                    text="스터디 소개"
                  />
                </Link>
                <Text color="sub" typo="body1">
                  {description}
                </Text>
              </Flex>
            </Flex>
          </section>
        </section>
      )}
    </header>
  );
};

export default Header;

const downArrowIconStyle = css({
  cursor: "pointer",
});
