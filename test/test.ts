import 'mocha';
import { app } from '../src';
import request from 'supertest';
import assert from 'assert';


// Test the /authors endpoint
describe('Authors', function() {
    
    //authors/name/{name}
    describe('by Name', function() {
        it('should return 200', async function() {
            const res = await request(app).get('/authors/name/Frank+Hessel');
            assert.equal(res.status, 200);
            
        });
    
        it('should not return empty', async function() {
            const res = await request(app).get('/authors/name/Frank+Hessel');
            assert.equal(isNotEmpty(res.body), true);
        });
    });

    //authors/orcid/{orcid}
    describe('by ORCID', function() {
        it('should return 200', async function() {
            const res = await request(app).get('/authors/orcid/0000-0002-9163-5989');
            assert.equal(res.status, 200);
            
        });
    
        it('should not return empty', async function() {
            const res = await request(app).get('/authors/orcid/0000-0002-9163-5989');
            assert.equal(isNotEmpty(res.body), true);
        });
    });
});

// Test the /groups endpoint
describe('Groups', function() {
    describe('Seemoo', function() {
        it('should return 200', async function() {
            const res = await request(app).get('/groups/seemoo');
            assert.equal(res.status, 200);
        });
    
        it('should not return empty', async function() {
            const res = await request(app).get('/groups/seemoo');
            assert.equal(isNotEmpty(res.body), true);
        });
    });
});


function isNotEmpty(arr: any[]) : boolean {
    return arr.some(e => e.eprintid !== undefined)
}