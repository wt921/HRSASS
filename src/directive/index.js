export const imgerror = {

    inserted(el, binding) {
        console.log("指令所在节点挂载");


        el.onerror = function () {

            console.log('图片出错了');
            el.src = binding.value;
        };
    },
    componentUpdated(el, binding) {

        el.src = el.src || binding.value;
    }
};
export const aa = {};
export const bb = {};