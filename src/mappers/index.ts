export const UserStatusMapper: { [key: string]: string } = {
  ACTIVE: "Active",
  BLOCKED: "Blocked",
};

export const UserRoleMapper: { [key: string]: string } = {
  USER: "User",
  ADMIN: "Admin",
};

export const UserStatusColorMapper: { [key: string]: string } = {
  BLOCKED: "error",
  ACTIVE: "success",
};

export const AmenityMapper: { [key: string]: string } = {
  PROPERTY: "Bất động sản",
  ROOM: "Phòng",
};

export const HotelStatusMapper: { [key: string]: string } = {
  AVAILABLE: "Đang hoạt động",
  REPAIRING: "Đang sửa chữa",
  DELETED: "Đã xóa",
};

export const HotelStatusColorMapper: { [key: string]: string } = {
  AVAILABLE: "success",
  REPAIRING: "default",
  DELETED: "error",
};

export const TestLevelMapper: { [key: string]: string } = {
  A1: "A1",
  A2: "A2",
  B1: "B1",
  B2: "B2",
  C1: "C1",
  C2: "C2",
  ENTRY_TEST: "Entry test",
};

export const TestLevelColorMapper: { [key: string]: string } = {
  A1: "green",
  A2: "lime",
  B1: "gold",
  B2: "orange",
  C1: "volcano",
  C2: "red",
  ENTRY_TEST: "cyan",
};

export const QuestionTypeMapper: { [key: string]: string } = {
  MULTIPLE_LISTENING: "Multiple listening",
  SINGLE_LISTENING: "Single listening",
  PARAGRAPH_READING: "Paragraph reading",
  SENTENCE_READING: "Sentence reading",
};
