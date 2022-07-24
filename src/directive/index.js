export const imgerror = {

    inserted(el, binding) {
        console.log('binding', binding);
        console.log('el', el);

        el.onerror = function () {

            console.log('图片出错了');
            el.src = binding.value;
        };
    }
};
export const aa = {};
export const bb = {};