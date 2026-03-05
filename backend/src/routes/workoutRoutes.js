import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'GET all workouts',
        data: []
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;

    res.json({
        message: `GET workout ${id}`,
        id: id
    })
})


router.post('/', (req, res) => {
    const {title, load, reps} = req.body;

    res.json({
        message: 'POST workout',
        data: {title, load, reps}
    });
})


router.patch('/:id', (req, res) => {
    const { id } = req.params;

    res.json({
        message: `PATCH workout ${id}`,
        updates: req.body
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    res.json({
        message: `DELETE workout ${id}`
    })
})

export default router;