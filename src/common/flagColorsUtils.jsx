import './flagsColorsUtils.css';

export function getPositionClass(position){
    if((position-1)%3 ===0)return 'yellow-color';
    if((position-2)%3 ===0)return 'white-color';
    return 'blue-color';
}