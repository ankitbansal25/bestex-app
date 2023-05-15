import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function SimpleDialog({title, open, onClose, DialogContent}: SimpleDialogProps) {

   const handleClose = () => {
        onClose();
   }

   return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{title}</DialogTitle>
            { DialogContent }
            </Dialog>
    )
}


interface SimpleDialogProps {
    title: string;
    open: boolean;
    onClose: () => void;
    DialogContent: JSX.Element;
}