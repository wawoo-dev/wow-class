import type { PageStudyStudentApiResponseDto } from "types/dtos/studyStudent";
import Pagination from "wowds-ui/Pagination";

const StudentPagination = ({
  pageInfo,
  handleClickChangePage,
}: {
  pageInfo: Omit<PageStudyStudentApiResponseDto, "content">;
  handleClickChangePage: (nextPage: number) => void;
}) => {
  if (!pageInfo || !pageInfo.numberOfElements) return null;
  return (
    <Pagination
      totalPages={pageInfo.totalPages}
      onChange={handleClickChangePage}
    />
  );
};

export default StudentPagination;
