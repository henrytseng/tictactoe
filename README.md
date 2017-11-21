# README.md

A self playing tic tac toe game.  

Allows user to play against computer player that finds the best, most successful move, from history.  



## Setup

Setup with

```
npm install
```



## Usage

To run use:

```
bin/tictactoe
```

For command line arguments

```
bin/tictactoe -?
```



## Computer Players

#### BadComputer

Find a random move to make based on all available moves on board.  


#### MimicComputer

Finds a best move based on ratio of winning games according to the state of the game board.  Falls back to random move if no history on state of board is known.  




## Human Player

Allows for user input to play computer

