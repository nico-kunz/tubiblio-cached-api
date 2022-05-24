import 'mocha';
import { app } from '../src';
import fs from 'fs';
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

// Test the /cache endpoints
describe('Cache', function() {
    describe('Clear', function() {
        it('should return 200', async function() {
            const res = await request(app).get('/cache/clear');
            assert.equal(res.status, 200);
        });
        it('should empty all files in data folder', async function () {
            // Create 10 files for testing
            const fileNames = Array.from(Array(10).keys());
            const promises = fileNames.map(fileName => fs.promises.writeFile(`data/${fileName}`, 'test'));
            await Promise.all(promises);

            // Clear cache and check if data folder is empty
            await request(app).get('/cache/clear');
            const files = await fs.promises.readdir('data');
            assert.equal(files.length, 0);
        })
    });

    describe('Update', function() {
        it('should return 200', async function() {
            const res = await request(app).get('/cache/update');
            assert.equal(res.status, 200);
        });

        it('should update files', async function() {
            // Create files for testing
            const filesToCheck = ['0000-0002-9163-5989', '0000-0003-1296-2920'];
            const promises = filesToCheck.map(fileName => fs.promises.writeFile(`data/${fileName}.json`, 'test'));
            await Promise.all(promises);

            // update cache and check if files are updated
            await request(app).get('/cache/update');
            
            for (const fileName of filesToCheck) {
                const file = await fs.promises.readFile(`data/${fileName}.json`);
                assert.notEqual(file, 'test');
            }
        });
    });
});

function isNotEmpty(arr: any[]) : boolean {
    return arr.some(e => e.eprintid !== undefined)
}