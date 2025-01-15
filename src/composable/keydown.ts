import { onBeforeUnmount, onMounted } from "vue";

type keyComboType={
     'key': string,
     'fn': () => void 
}[]
export const useKeyDown = (keyCombo: keyComboType)=>{

    const onKeyDown = (event: KeyboardEvent) => {
        let kc = keyCombo.find(kc => kc.key === event.key);

        if (kc) {
            kc.fn();
        }
        // console.log(event.key,event.ctrlKey)
    }
    
    onMounted(() => { window.addEventListener('keydown', onKeyDown); })
    onBeforeUnmount(() => {
        window.removeEventListener('keydown', onKeyDown);
    });

    return {
        onKeyDown
    }
}

/**
 * Usage example in parent component
 * 
 *     import  {useKeyDown} from "../../composable/keydown"
 * 
 *     useKeyDown( [
        {'key':'ArrowUp',fn:up},
        {'key':'ArrowDown',fn:down},
        {'key':'ArrowLeft',fn:left},
        {'key':'ArrowRight',fn:right}
    ])
 * 
 */

