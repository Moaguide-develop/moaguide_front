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
          .join(" ");
      } else {
        // HTML 형식 처리
        return input.replace(/<\/?[^>]+(>|$)/g, "").replace(/\n/g, " ").trim();
      }
    } catch {
      // 기본 문자열 반환
      return input.replace(/\n/g, " ");
    }
  };