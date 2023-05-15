*[ [[Category - Computer Science]] ][ [[complexity theory]] ]*

# Turing Machines 

### History
In his 1936 paper *ON COMPUTABLE NUMBERS, WITH AN APPLICATION TO THE ENTSCHEIDUNGSPROBLEM*, Alan Turing introduced the concept of a Turing Machine, which is a machine capable of performing any symbolic calculation - this is argued in the [[Church-Turing Thesis]]. 

### Formal Definition
A TM is a 7-tuple of the form:
$$ M = (Q, \Sigma, \Gamma, \delta, q_0, q_{accept}, q_{reject}) $$ 
Where: 
* $Q$ is a finite set of states ("states of the mind")
* $\Sigma$ is finite input alphabet (often binary)
* $\Gamma$ is the finite tape alphabet, containing $\Sigma$ as well as the special empty/space symbol
* $\delta : Q \times \Gamma \to Q \times \Gamma \times \{ L, R \}$ the transition function mapping to Left-Right movements