const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');

const {
    nanoid
} = require('nanoid');
var uniqueSlug = require('unique-slug')

const URL = require('../models/url');
const {
    response
} = require('express');

router.get('', (req, res, next) => {
    res.status(200).json({
        message: "🔗"
    })
});

router.get('/:slug', (req, res, next) => {
    paramSlug = req.params.slug;

    URL.findOne({
            slug: paramSlug
        })
        .select("url slug")
        .then(url => {
            if (!url) {
                next(new Error("NO URL FOUND"));
            }
            // res.status(200).json({
            //     url: url
            // })
            res.status(302).redirect(url.url);

        })
        .catch(error => {
            next(new Error(error));
        })
});

router.post('', (req, res, next) => {
    bodyUrl = req.body.url;
    bodySlug = req.body.slug;

    if (!bodySlug) {
        bodySlug = uniqueSlug(bodyUrl);
    }


    if (validUrl.isUri(bodyUrl)) {
        const url = new URL({
            slug: bodySlug,
            url: bodyUrl
        })

        url.save()
            .then(newUrl => {
                res.status(200).json({
                    url: newUrl
                })

            })
            .catch(error => {
                next(new Error(error));
            })

    } else {
        next(new Error("NOT AN URI"));
    }
});


module.exports = router;