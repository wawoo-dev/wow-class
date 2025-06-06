"use client";

import { Flex } from "@styled-system/jsx";
import { Modal, Space, Text } from "@wow-class/ui";
import { useModalRoute } from "@wow-class/ui/hooks";
import { studyApi } from "apis/study/studyApi";
import { tags } from "constants/tags";
import { useSearchParams } from "next/navigation";
import { revalidateTagByName } from "utils/revalidateTagByName";
import Button from "wowds-ui/Button";

const AnnouncementDeleteModal = () => {
  const searchParams = useSearchParams();

  const studyAnnouncementId = searchParams.get("studyAnnouncementId");

  const { onClose } = useModalRoute();

  const handleClickDeleteButton = async () => {
    const result = await studyApi.deleteStudyAnnouncement(
      Number(studyAnnouncementId)
    );
    if (result.success) {
      await revalidateTagByName(tags.announcements);
      onClose();
    }
  };

  return (
    <Modal>
      <Flex direction="column" textAlign="center" width="21rem">
        <Text typo="h1">공지를 삭제하시겠어요?</Text>
        <Space height={33} />

        <Flex gap="sm">
          <Button
            aria-label="공지 삭제 취소하기"
            variant="outline"
            onClick={onClose}
          >
            취소
          </Button>
          <Button aria-label="공지 삭제하기" onClick={handleClickDeleteButton}>
            삭제하기
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default AnnouncementDeleteModal;
