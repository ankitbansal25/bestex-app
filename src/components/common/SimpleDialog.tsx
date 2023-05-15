import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

/**
 * Dialog Component
 */
export default function SimpleDialog({
    title,
    open,
    onClose,
    dialogContent,
}: SimpleDialogProps) {
    const handleClose = () => {
        onClose()
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{title}</DialogTitle>
            {dialogContent}
        </Dialog>
    )
}

/**
 * @typedef SimpleDialogProps
 */
interface SimpleDialogProps {
    title: string
    open: boolean
    onClose: () => void
    dialogContent: JSX.Element
}
