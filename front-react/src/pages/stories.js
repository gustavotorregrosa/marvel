import React, { useContext, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProgressLine from '../components/progressLine'
import Box from '@material-ui/core/Box';


const ShowStoryModal = props => {
    const [open, setOpen] = React.useState(false)
    const [story, setStory] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    const handleClickOpen = async (storyData) => {
        setOpen(true)
        setStory({
            ...storyData
        })
        let response = await fetch('http://localhost:4200/stories/' + storyData.id)
        response = await response.json()
        setLoading(false)
        setStory({
            ...storyData,
            creators: response[0].creators.items
        })
    }

    const handleClose = () => {
        setOpen(false)
        setLoading(false)
    }

    const getCreators = () => {
        const creators = story.creators ? story.creators : []
        const creatorsArray = creators.map(el => el.name + " as " + el.role)

        return creatorsArray.join(", ")
    }

    useEffect(() => {
        props.setOpenModal(handleClickOpen)
    })
    

    return (
        <div>
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Story</DialogTitle>
                <DialogContent
                    maxWidth="lg"
                    fullWidth
                >
                    <Box display="flex"
                        maxWidth="lg"
                        fullWidth
                    >
                           <Box 
                            maxWidth="lg"
                            fullWidth
                            style={{
                                width: '45%',
                                height: '10em',
                                marginRight: '1em'

                            }}
                        >
                            <TextField
                                disabled
                                value={story.title}
                                id="title"
                                label="Title"
                                type="text"
                                fullWidth
                                maxWidth="lg"
                                multiline
                                variant="outlined"
                                
                            />
                        </Box>

                        <Box 
                            maxWidth="lg"
                            fullWidth
                            style={{
                                width: '45%',
                                height: '10em',
                                marginRight: '1em'
                            }}
                        >
                            <TextField
                                disabled
                                value={getCreators()}
                                id="creators"
                                label="Creators"
                                type="text"
                                fullWidth
                                maxWidth="lg"
                                multiline
                                variant="outlined"
                                
                            />
                        </Box>
                    </Box>
   
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                            Cancel
                    </Button>
                </DialogActions>
                {loading ? <ProgressLine /> : null}

            </Dialog>

        </div>
    );

}

const Stories = props => {
    const [stories, setStories] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    const columns = [
        { field: 'id', headerName: 'ID', width: '10%', hide: false },
        { field: 'title', headerName: 'Title', type: 'string', width: '90%' }
    ]

    useEffect(() => {
        readStories()
    }, [])

    const readStories = async () => {
        let storyData = await fetch('http://localhost:4200/stories')
        storyData = await storyData.json()
        storyData = storyData.map(s => {
            return {
                id: s.id,
                title: s.title
            }
        })

        setStories(storyData)
        setLoading(false)
    }

    let childOpenModalShow = () => {}
    const showStory = ({ id, title }) => {
        childOpenModalShow({id, title})
    }

    return (<Container>
        <br />
        <br />
        <br />

        <div style={{ height: 400, width: '100%' }}>
           
            <DataGrid rows={stories} columns={columns} pageSize={6} onRowSelected={(params) => { showStory(params.data) }} disableMultipleSelection />
            {loading ? <ProgressLine /> : null }
        </div>
        <ShowStoryModal setOpenModal={f => childOpenModalShow = f} {...props} />
    </Container>)


}

export default Stories