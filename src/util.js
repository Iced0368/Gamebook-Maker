function copyToClipboard(text) {
    // 텍스트를 포함한 임시 요소를 생성
    const tempElement = document.createElement('textarea');
    tempElement.value = text;

    // 요소를 화면 밖으로 이동
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    document.body.appendChild(tempElement);

    // 텍스트 선택 및 복사
    tempElement.select();
    document.execCommand('copy');

    // 생성한 임시 요소 삭제
    document.body.removeChild(tempElement);
}

const readFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            resolve(event.target.result);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsText(file);
    });
};


export {copyToClipboard, readFile};