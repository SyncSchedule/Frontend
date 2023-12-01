//날짜 관련 컴포넌트

export const getDayText = (d: number): string => {
    let day = ''

    switch (d) {
        case 0:
            day = "일"
            break;
        case 1:
            day = "월"
            break;
        case 2:
            day = "화"
            break;
        case 3:
            day = "수"
            break;
        case 4:
            day = "목"
            break;
        case 5:
            day = "금"
            break;
        case 6:
            day = "토"
            break;
        default:
            break;
    }

    return day
}