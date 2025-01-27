export const extractText = (input: string): string => {
    try {
      if (input.startsWith("[") && input.endsWith("]")) {
        // JSON 형식 처리
        const jsonArray = JSON.parse(input);
        return jsonArray
          .map((item: any) =>
            item.content
              ?.map((contentItem: any) => contentItem.text || "")
              .join("")
          )
          .join("\n");
      } else {
        // HTML 형식 처리
        return input.replace(/<\/?[^>]+(>|$)/g, "").trim();
      }
    } catch {
      // 기본 문자열 반환
      return input;
    }
  };