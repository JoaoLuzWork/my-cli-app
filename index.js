#!/usr/bin/env node

//aniamtions for the consle
import chalk from 'chalk';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet';

//
import inquirer from 'inquirer';
import { type } from 'node:os';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTittle = chalkAnimation.rainbow(
        'Welcome to best programming lenguage quiz \n'
    );

    await sleep();
    rainbowTittle.stop();

    console.log(`
        ${chalk.bgBlueBright('how to play\n')}
        I am a process on your computer.
        I will make some questions if u get any 
        question wrong ${chalk.bgRed('You are not a real dev')}
        `)
}

async function askInfo() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'what is you name?' ,
        default() {
            return 'player';
        },
    });

    playerName= answers.player_name;
}

async function question1() {
    const answers = await inquirer.prompt({
        name:'question_1',
        type:'list',
        message:'What is the best programming lenguage of all times?\n',
        choices: [
            'A)JavaScript',
            'B)C',
            'C)Julia',
            'D)PHP',

        ],
    });
    
    return handleAnswer(answers.question_1 == 'D)PHP');
}

async function question2() {
    const answers = await inquirer.prompt({
        name:'question_2',
        type:'list',
        message:'why do you think PHP is the best lenguage?\n',
        choices: [
            'A)Because is a gorgeous programming lenguage for all dev in the world',
            'B)It is not the best at all',
            'C)Terrible programming lenguage',
            'D)I cannot stand PHP',

        ],
    });
    
    return handleAnswer(answers.question_2 == 'A)Because is a gorgeous programming lenguage for all dev in the world');
}

async function question3() {
    const answers = await inquirer.prompt({
        name:'question_3',
        type:'list',
        message:'What part of PHP do you love the most?\n',
        choices: [
            'A)There is nothing good about PHP',
            'B)I hate PHP',
            'C)easy syntax, easy to learn and use',
            'D)I will never ever use PHP',

        ],
    });
    
    return handleAnswer(answers.question_3 == 'C)easy syntax, easy to learn and use');
}

async function question4() {
    const answers = await inquirer.prompt({
        name:'question_4',
        type:'list',
        message:'What are gonna do after this quiz?\n',
        choices: [
            'A)This game sucks',
            'B)I rather change my career than use PHP',
            'C)Use PHP as my main lenguage forever',
            'D)Delete this app',

        ],
    });
    
    return handleAnswer(answers.question_4 == 'C)Use PHP as my main lenguage forever');
}


async function handleAnswer(isCorret) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
    
    if (isCorret) {
        spinner.success({text:`Good to know that you deserve continue`});
    } else{
        spinner.error({text:`X X X WRONG, ${playerName} come on mate you know do right question ;) X X X`});
        process.exit(1);
    };
}

function winner() {
    console.clear();
    const msg = `Yeah mate you are definitely\n
                 the best DEV I have ever seen`;
    figlet(msg, (err, data) =>{
        console.log(gradient.pastel.multiline(data));
    });
}

await welcome();
await askInfo();
await question1();
await question2();
await question3();
await question4();
winner()