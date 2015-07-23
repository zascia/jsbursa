(function () {

    var count;
    var sequenceCall = [];
    var parallelCall = [];
    var checkSequenceCalled = false;
    var checkParallelCalled = false;

    function checkSequence() {
        if (checkSequenceCalled) {
            alert('Множественные вызовы финальной функции! Это неверно!');
            return;
        }
        checkSequenceCalled = true;
        function isOk() {
            if (sequenceCall.length !== count * 2) {
                return false;
            }
            for (var i = 0; i < count; i++) {
                if (
                    sequenceCall[i * 2] !== ('f' + (i + 1) + ' start') ||
                    sequenceCall[i * 2 + 1] !== ('f' + (i + 1) + ' end')
                ) {
                    return false;
                }
            }
            return true;
        }

        var light = document.querySelector('.sequence .final');
        light.classList.add(isOk() ? 'done' : 'bad');
    }

    function checkParallel() {
        if (checkParallelCalled) {
            alert('Множественные вызовы финальной функции! Это неверно!');
            return;
        }
        checkParallelCalled = true;
        function isOk() {
            var i;
            if (parallelCall.length !== count * 2) {
                return false;
            }

            for (i = 0; i < count; i++) {
                if (!parallelCall[i].match('start')) {
                    return false;
                }
            }

            for (i = count; i < count * 2; i++) {
                if (!parallelCall[i].match('end')) {
                    return false;
                }
            }

            return true;
        }

        var light = document.querySelector('.parallel .final');
        light.classList.add(isOk() ? 'done' : 'bad');
    }



    function generateTimeoutFn(index, div, list) {
        return function (cb) {
            console.log('Вызвана функция f' + index);
            list.push('f' + index + ' start');
            div.classList.add('pending');
            setTimeout(function () {
                div.classList.remove('pending');
                div.classList.add('done');
                console.log('Завершена функция f' + index);
                list.push('f' + index + ' end');
                cb('f' + index);
            }, 2000 + Math.random() * 3000);
        }
    }

    window.addEventListener('load', function generateSequence() {
        var i = 1;
        window.sequenceFns = [];
        count = 2 + ~~(Math.random() * 8);
        var sequence = document.querySelector('section.sequence');
        for (; i <= count; i++) {
            var div = document.createElement('div');
            div.className = 'light';
            var title = 'f' + i;
            div.innerText = title;
            sequence.appendChild(div);
            window.sequenceFns.push(generateTimeoutFn(i, div, sequenceCall));
        }

        window.parallelFns = [];
        var parallel = document.querySelector('section.parallel');
        for (; i <= count * 2; i++) {
            var div = document.createElement('div');
            div.className = 'light';
            var title = 'f' + i;
            div.innerText = title;
            parallel.appendChild(div);
            window.parallelFns.push(generateTimeoutFn(i, div, parallelCall));
        }

    });

    window.checkSequence = checkSequence;
    window.checkParallel = checkParallel;
})();