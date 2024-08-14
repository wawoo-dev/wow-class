import { css } from "@styled-system/css";
import { Flex, styled } from "@styled-system/jsx";
import { Space, Text } from "@wow-class/ui";
import Image from "next/image";
import Box from "wowds-ui/Box";
import Button from "wowds-ui/Button";
import Tag from "wowds-ui/Tag";
import TextButton from "wowds-ui/TextButton";

export const DefaultHomeworkBox = () => {
  return (
    <Box
      text={
        <>
          <Text color="primary" typo="label2">
            4주차
          </Text>
          <Space height={16} />
          <Flex gap="xs">
            <Text as="h2" typo="h2">
              HTTP 통신 코드 작성하기
            </Text>
            <Tag color="blue" variant="solid2">
              제출 완료
            </Tag>
          </Flex>
          <TextButton style={{ paddingLeft: "0px" }} text="과제 명세 확인" />
          <Space height="xs" />
          <div className={descriptionStyle}>
            종료 일시 : 2024년 5월 23일 23:59
          </div>
          <Flex className={descriptionStyle} gap="xs">
            <div>
              제출한 과제 :
              <styled.span color="textBlack">
                2024-1-Web-Study/Week4
              </styled.span>
            </div>
            <Image alt="dot" height={6} src="/images/dot.svg" width={6} />
            <styled.div color="primary">글자수 충족</styled.div>
          </Flex>
          <Space height={26} />
          <Button style={{ maxWidth: "100%" }} variant="outline">
            제출하러 가기
          </Button>
          <Space height={8} />
          <Button style={{ maxWidth: "100%" }}>제출 완료</Button>
        </>
      }
    />
  );
};

const descriptionStyle = css({
  color: "sub",
  textStyle: "body1",
});
