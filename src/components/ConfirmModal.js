import { Modal } from 'antd';

const ConfirmModal = (args) => {
    const defaultArgs = {
        title: 'Delete',
        content: 'Sure to delete?',
        onCancel: () => { console.log('cancel'); },
        onOk: () => { console.log('ok'); }
    };

    const confirm = Modal.confirm;
    confirm({ ...defaultArgs, ...args });
};

export default ConfirmModal;
