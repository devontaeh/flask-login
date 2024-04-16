## Workout log generator Feature Notes

The way it works is users have workouts in their library, which are stored as 'workoutTemplates' in our DB. These workouts contain props pertaining to name, creator, associated muscle, exercises involed, etc. When the user wants to 'execute' a workout in their library, we load that workoutTemplate into a screen and allow them to fill out sets/reps values for all of the workouts child exercises (workouts have 'exerciseTemplates' that refer to all the exercises in that workout - 'exerciseTemplates' are another data type in our DB).

When a user goes to 'execute' a workout, they fill in the sets/reps for all of the sets included in all of the exercises in a workout. After doing this, they can submit the workout and we generate a 'workoutLog' which is a log that actually contains the data for that workout on that date - see the workoutLog schema below.

So what you'd need to do is write an application that 1. takes some plaintext description of a workout (log) with sets/reps info for exercises and 2. creates a workout record/JSON object fitting to a workout and it's child exercises. Note that a workoutLog also has a list of child 'exerciseLogs' where each exerciseLog corresponds to an exerciseTemplate in the selected workoutTemplate

### The workflow would look something like
1. user is shown list of workouts
2. user selects workout (workoutTemplate) they are going to execute
3. user enters plaintext info to fill in that workout log (such as "bench press warmup 50x10 and then 100x7, 2 working sets of 225 for 12 and then 8. Then cable chest flies 80lbs for 4 sets for 12,10,8 reps")
4. your data is sent to the LLM api and given your prompt (you will pass the workoutTemplate schemema/format and the paintext, and probably the schema for the workoutLog and exerciseLog(s) it needs to generate) and then it will return a formatted workoutLog object (also containing an array of exerciseLogs)
5. this workoutLog and it's child exerciseLogs are saved in our DB

note you can leave certain props off the workoutLog and we can manually add them, such as creatorID, stats etc. You don't need to pass these props to the LLM because it will just add noise and we will just need to manually add them ourselves anyways.

### Notes
- a workout is a 'workoutTemplate'
- these workouts have child exercises - exercisesTemplates, which are stored in an array under the "workout.exerciseTemplates" prop (see schema below)
- exerciseTemplates contain a list of sets (see exercisetemplate.sets prop), where each set is an expected set the user should do (WITHOUT the reps/weight - they fill in reps/weight when they 'execute' the workout - these sets are just a template to say do "2 warmup sets, 2 working sets")
- sets are an object with a single prop "type" (working or warmup)

### See the following schemas below:
**workoutTemplate** - a workout that the user has and will execute
**workoutLog** - the log generated against the parent workout (with data)
**exerciseTemplate** - a exercise that is included in the workout (see workout.exercisetemplates prop)
**exerciseLog** - the log that is generated for the exercises and is included in the workoutLog
**setTemplate** - defines the shape of a set in an exercise

<details>
    <summary>workoutTemplate schema</summary>

```js
    const workoutTemplate = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        exerciseTemplates: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ExerciseTemplate"
        }],
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        muscleGroup: [{
            type: String,
            required: true,
            enum: {
                values: MuscleGroupNames,
                message: `Must be of the following: ${MuscleGroupNames}`
            }
        }],
        description: String,
        type: {
            type: String
        },
        attachments: [String],
        access: {
            type: String,
            enum: ["public", "unlisted", "private"],
            default: "private"
        },
        likes: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }],
        },
        dislikes: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }],
            select: false,
        },
        textColor: {
            type: String,
            enum: ["white", "gray", "black"],
            default: "black"
        }
    });
    ```
</details>

<details>
    <summary>workoutLog schema</summary>

```js
const workoutLog = new mongoose.Schema({
    workoutTemplate: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkoutTemplate",
    },
    name: {
        type: String,
        required: true,
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    exerciseLogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExerciseLog"
    }],
    muscleGroup: [{
        type: String,
        required: true,
        enum: {
            values: MuscleGroupNames,
            message: `Must be of the following: ${MuscleGroupNames}`
        }
    }],
    description: String,
    attachments: [String],
    access: {
        type: String,
        enum: ["public", "private"],
        default: "private"
    },
    stats: {
        type: statsSchema,
        immutable: true,
    }
});
```
</details>

<details>
    <summary>setTemplate schema</summary>

```js
const setTemplate = new mongoose.Schema({
    comments: {
        type: String,
        maxLength: 150
    },
    weight: {
        type: Number,
        min: 0
    },
    reps: {
        type: Number,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: "reps must be an integer."
        }
    },
    type: {
        required: true,
        type: String,
        enum: ["warmup", "working", "drop"]
    },
    restTime: {
        type: Number,
        min: 0
    },
});
```
</details>

<details>
    <summary>exerciseTemplate schema</summary>

```js
const exerciseTemplate = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    movement: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movement",
    },
    equipment: {
        type: String,
        enum: ["smith", "machine", "cables", "dumbbells", "barbell"]
    },
    otherEquipment: {
        type: String,
    },
    movementVariation: {
        type: String,
        enum: ["seated", "standing", "lying"]
    },
    creatorId: {
        type: String,
        required: true,
    },
    description: String,
    type: {
        type: String,
        enum: ["Lift", "Cardio", "Mobility"]
    },
    media: [String],
    access: {
        type: String,
        enum: ["public", "private", "unlisted"],
        default: "private"
    },
    likes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
    },
    dislikes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        select: false,
    },
    sets: [{
        type: setTemplateSchema
    }]
});
```
</details>
<details>
    <summary>exerciseLog schema</summary>

```js
const exerciseLog = new mongoose.Schema({
    exerciseTemplate: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExerciseTemplate",
        immutable: true,
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    creatorId: {
        type: String,
        required: true,
        immutable: true,
    },
    date: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    description: String,
    type: {
        type: String,
        enum: {
            values: ["Lift", "Cardio", "Mobility"],
            message: "Must be \"Lift\", \"Cardio\", \"Mobility\"",
        },
        immutable: true,
    },
    attachments: [String],
    access: {
        type: String,
        enum: ["public", "private"],
        default: "private"
    },
    sets: {
        type: [{
            type: setLogSchema
        }],
        immutable: true,
    },
    stats: {
        type: statsSchema,
        required: true,
        immutable: true,
    },
});
```
</details>