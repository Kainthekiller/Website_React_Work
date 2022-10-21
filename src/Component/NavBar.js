import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {Button} from "@mui/material";
import {ButtonGroup} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {useState} from "react";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',

    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const theme = createTheme({
    palette: {
    primary: {
        light: '#ffeb3b', // this should work
        main: '#f50057' // or this if using `primary` style
        }
    }
});


export default function SearchAppBar(props) {
    const [searchedItem, setSearchedItem] = useState("")
    function searchMovie(e)
    {
        e.preventDefault()
        //Fetch
        fetch(`http://localhost:3001/search?query=${searchedItem}` )
            .then(response => response.json())
            .then((responseDate) =>
            {
                props.setMovieList(responseDate);
            })
        console.log(searchedItem)

    }

    //retrieve all movies from server
    function fetchMovieList() {
        fetch("http://localhost:3001/movies/")
            .then(res => res.json())
            .then(data => {
                props.setMovieList(data)
            })

        // console.log(movieList)
    }



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{background: "black" , height: "75px"}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <h1 className={"GMDB"}>GMDB</h1>
                        <ButtonGroup className={"BTNGroup"} variant="text"
                        aria-label="outlined button group">
                            <Button onClick={() => {{{fetchMovieList()}} {props.multipleViewStatus(true)}}} sx={{ color: 'white', borderColor: 'white' }}>Home</Button>
                            <Button onClick={() => console.log("Click")}  sx={{ color: 'white', borderColor: 'white' }}>Login</Button>
                        </ButtonGroup>
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <form onSubmit={ (e) => searchMovie(e)}>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => {setSearchedItem(e.target.value)}}
                        />
                        </form>

                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
