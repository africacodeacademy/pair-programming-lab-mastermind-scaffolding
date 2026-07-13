
# Scaffolding for Mastermind

## To install (for ESLint)

1. [Clone](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository) this repository
1. Run `npm install`

Step 

#Algorithm
1. start
2. create a variable called correct place and set it to 0;
3.create function called checkguess(guess, solution)
4.create variable called commom and set it to 0;
5. create an empty set called checked. 
6. for each character in guess:
    -add it to checked
    -count how many times it appears in guess
    -count how many times it appears in solution 
    -add the smaller of the two counts to common
7. loop through each position (index) in guess:
    -if the character at the current index is the same as the charactther at the same index slution, increase correctplace by 1.
8. calculate wrongplace by subtracting correct place from the common
9. return the result as "correctplace-wrongplace"
10. end
