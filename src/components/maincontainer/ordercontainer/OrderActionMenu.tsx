import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { CiMenuKebab } from 'react-icons/ci'

/**
 * OrderActionMenu Component
 */
export default function OrderActionMenu({
    data,
    actions,
    handleMenuItemClick,
}: OrderActionMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = (action: string) => {
        setAnchorEl(null)
        handleMenuItemClick(data, action)
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                startIcon={<CiMenuKebab />}
            ></Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {actions.map((action: string) => {
                    return (
                        <MenuItem
                            key={action}
                            onClick={() => handleClose(action)}
                        >
                            {action}
                        </MenuItem>
                    )
                })}
            </Menu>
        </div>
    )
}

/**
 * OrderActionMenu Component Props
 */
interface OrderActionMenuProps {
    data: any
    actions: Array<string>
    handleMenuItemClick: (data: any, action: string) => void
}
