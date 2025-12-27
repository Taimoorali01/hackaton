        let quizState = {
            total: 0,
            current: 0,
            score: 0,
            correctAnswer: 0
        };

        function startQuiz() {
            const countInput = document.getElementById('input-qty').value;
            quizState.total = parseInt(countInput);

            if(quizState.total > 0) {
                document.getElementById('view-start').classList.add('hidden');
                document.getElementById('view-quiz').classList.remove('hidden');
                generateNewTask();
            }
        }

        function generateNewTask() {
            const n1 = Math.floor(Math.random() * 10) + 2;
            const n2 = Math.floor(Math.random() * 10) + 2;
            const ops = ['+', '-', '*'];
            const activeOp = ops[Math.floor(Math.random() * ops.length)];

            if(activeOp === '+') quizState.correctAnswer = n1 + n2;
            if(activeOp === '-') quizState.correctAnswer = n1 - n2;
            if(activeOp === '*') quizState.correctAnswer = n1 * n2;

            document.getElementById('math-display').innerText = `${n1} ${activeOp === '*' ? '×' : activeOp} ${n2}`;
            document.getElementById('label-progress').innerText = `Question ${quizState.current + 1} / ${quizState.total}`;
            
            const box = document.getElementById('input-ans');
            box.value = '';
            box.className = 'math-input';
            box.focus();
            
            document.getElementById('feedback-text').innerText = '';
            document.getElementById('btn-submit').disabled = false;
        }

        function handleLogic() {
            const inputField = document.getElementById('input-ans');
            const feedback = document.getElementById('feedback-text');
            const btn = document.getElementById('btn-submit');
            const userVal = parseInt(inputField.value);

            if(isNaN(userVal)) return;

            btn.disabled = true;

            if(userVal === quizState.correctAnswer) {
                quizState.score++;
                inputField.classList.add('success-border');
                feedback.innerHTML = `<span style="color: var(--correct-glow)">Perfect!</span>`;
            } else {
                inputField.classList.add('error-border');
                feedback.innerHTML = `<span style="color: var(--wrong-glow)">Incorrect. It was ${quizState.correctAnswer}</span>`;
            }

            setTimeout(() => {
                quizState.current++;
                if(quizState.current < quizState.total) {
                    generateNewTask();
                } else {
                    showFinalScore();
                }
            }, 1200);
        }

        function showFinalScore() {
            document.getElementById('view-quiz').classList.add('hidden');
            document.getElementById('view-result').classList.remove('hidden');
            document.getElementById('score-text').innerText = `${quizState.score} / ${quizState.total}`;
        }

        document.getElementById('input-ans').addEventListener('keypress', (e) => {
            if(e.key === 'Enter' && !document.getElementById('btn-submit').disabled) {
                handleLogic();
            }
        });