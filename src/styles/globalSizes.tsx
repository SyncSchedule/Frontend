//
// size scaling
//
import {
    responsiveScreenWidth,
    responsiveScreenHeight,
    responsiveScreenFontSize
} from "react-native-responsive-dimensions";

const FIGMA_WINDOW_WIDTH = 390;
const FIGMA_WINDOW_HEIGHT = 844;

export function rw(width: number): number {
    const percentage = (width / FIGMA_WINDOW_WIDTH) * 100;

    return responsiveScreenWidth(percentage);
}

export function rh(height: number): number {
    const percentage = (height / FIGMA_WINDOW_HEIGHT) * 100;

    return responsiveScreenHeight(percentage);
}

export function rf(size: number): number {
    const percentage = size * 0.125;

    return responsiveScreenFontSize(percentage);
}