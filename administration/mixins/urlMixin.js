export default {
    setup(props, context) {
        const state = reactive({
            serverUrl: `http://localhost:3030`
        });

        return {
            state,
        };
    },
}